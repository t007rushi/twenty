import { Command, CommandRunner } from 'nest-commander';

import { InjectMessageQueue } from 'src/engine/core-modules/message-queue/decorators/message-queue.decorator';
import { MessageQueue } from 'src/engine/core-modules/message-queue/message-queue.constants';
import { MessageQueueService } from 'src/engine/core-modules/message-queue/services/message-queue.service';
import { MessagingMessageChannelSyncStatusMonitoringCronJob } from 'src/modules/messaging/monitoring/crons/jobs/messaging-message-channel-sync-status-monitoring.cron';

const MESSAGING_MESSAGE_CHANNEL_SYNC_STATUS_MONITORING_CRON_PATTERN =
  '2/10 * * * *'; //Every 10 minutes, starting at 2 minutes past the hour

@Command({
  name: 'cron:messaging:monitoring:message-channel-sync-status',
  description:
    'Starts a cron job to monitor the sync status of message channels',
})
export class MessagingMessageChannelSyncStatusMonitoringCronCommand extends CommandRunner {
  constructor(
    @InjectMessageQueue(MessageQueue.cronQueue)
    private readonly messageQueueService: MessageQueueService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.messageQueueService.addCron<undefined>(
      MessagingMessageChannelSyncStatusMonitoringCronJob.name,
      undefined,
      {
        repeat: {
          pattern:
            MESSAGING_MESSAGE_CHANNEL_SYNC_STATUS_MONITORING_CRON_PATTERN,
        },
      },
    );
  }
}
