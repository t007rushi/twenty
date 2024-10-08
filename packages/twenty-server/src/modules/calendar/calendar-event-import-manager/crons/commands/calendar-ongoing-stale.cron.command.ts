import { Command, CommandRunner } from 'nest-commander';

import { InjectMessageQueue } from 'src/engine/core-modules/message-queue/decorators/message-queue.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/core-modules/message-queue/services/message-queue.service';
import { CalendarOngoingStaleCronJob } from 'src/modules/calendar/calendar-event-import-manager/crons/jobs/calendar-ongoing-stale.cron.job';

const CALENDAR_ONGOING_STALE_CRON_PATTERN = '0 * * * *';

@Command({
  name: 'cron:calendar:ongoing-stale',
  description:
    'Starts a cron job to check for stale ongoing calendar event imports and put them back to pending',
})
export class CalendarOngoingStaleCronCommand extends CommandRunner {
  constructor(
    @InjectMessageQueue(MessageQueue.cronQueue)
    private readonly messageQueueService: MessageQueueService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.messageQueueService.addCron<undefined>(
      CalendarOngoingStaleCronJob.name,
      undefined,
      {
        repeat: { pattern: CALENDAR_ONGOING_STALE_CRON_PATTERN },
      },
    );
  }
}
