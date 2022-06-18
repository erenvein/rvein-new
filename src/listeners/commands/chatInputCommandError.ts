import {
    Listener,
    ChatInputCommandErrorPayload,
  } from "@sapphire/framework";
  
  export class CommandDenied extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
      super(context, {
        ...options,
        event: "chatInputCommandError"
      });
    }
  
    public async run(error: Error, { interaction }: ChatInputCommandErrorPayload) {
      if (Reflect.get(Object(error), "silent")) return;
        
      await interaction.reply(error.message)
    }
  }