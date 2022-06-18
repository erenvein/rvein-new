import {
  Listener,
  UserError,
  MessageCommandDeniedPayload,
} from "@sapphire/framework";
import { replyLocalized } from "@sapphire/plugin-i18next";
import humanize from 'humanize-duration';

export class CommandDenied extends Listener {
  public constructor(context: Listener.Context, options: Listener.Options) {
    super(context, {
      ...options,
      event: "messageCommandDenied"
    });
  }

  public async run(error: UserError, { message }: MessageCommandDeniedPayload) {
    if (Reflect.get(Object(error.context), "silent")) return;

    if(error.identifier === "preconditionCooldown") {
      const { remaining } = error.context as { remaining: number };
      return await replyLocalized(message, { keys: 'commandEvent:cooldown', formatOptions: { remaining: humanize(remaining).replace('seconds', 'saniye').replace('hours', 'saat'), remainingn: humanize(remaining) } })
    }
     else if(error.identifier === "argsMissing") {
      return await replyLocalized(message, { keys: 'commandEvent:argsMissing'})
    }
     else if(error.identifier === "argsUnavailable") {
      return await replyLocalized(message, { keys: 'commandEvent:argsUnavailable'})
    }
     else if(error.identifier === "preconditionGuildOnly") {
      return await replyLocalized(message, { keys: 'commandEvent:preconditionGuildOnly'})
    }
     else if(error.identifier === "preconditionNsfw") {
      return await replyLocalized(message, { keys: 'commandEvent:preconditionNSFW'})
    }
     else if(error.identifier === "preconditionUserPermissions") {
      const { missing } = error.context as { missing: [] };
      return await replyLocalized(message, { keys: 'commandEvent:preconditionUserPermissionsNoPermissions', formatOptions: { perm: missing }})
    } else {
      return await message.reply(error.message)
      
    }
  }
}