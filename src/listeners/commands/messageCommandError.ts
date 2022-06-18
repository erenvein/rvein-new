import {
    Listener,
    MessageCommandErrorPayload,
  } from "@sapphire/framework";

  export class CommandDenied extends Listener {
    public constructor(context: Listener.Context, options: Listener.Options) {
      super(context, {
        ...options,
        event: "messageCommandError"
      });
    }
  
    public run(error: Error, { message }: MessageCommandErrorPayload) {
      return message.channel.send(error.message)
    }
  }