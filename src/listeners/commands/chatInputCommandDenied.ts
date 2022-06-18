import {
    Listener,
    UserError,
    ChatInputCommandDeniedPayload,
  } from "@sapphire/framework";
  import humanize from 'humanize-duration';
  
  export class CommandDenied extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
      super(context, {
        ...options,
        event: "chatInputCommandDenied"
      });
    }
  
    public async run(error: UserError, { interaction }: ChatInputCommandDeniedPayload) {
      if (Reflect.get(Object(error.context), "silent")) return;
  
      if(error.identifier === "preconditionCooldown") {
        const { remaining } = error.context as { remaining: number };
        return await interaction.reply(`You are on a cooldown ${humanize(remaining)}`)
      } else {
        return await interaction.reply(error.message)
        
      }
    }
  }