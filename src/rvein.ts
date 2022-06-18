import { RveinClient } from './lib/RveinClient';
import { AutoPoster } from 'topgg-autoposter';
import { DBL, MONGO } from './config';
import mongoose from 'mongoose';

mongoose.connect(`${MONGO}`)

export const client = new RveinClient()

const poster = AutoPoster(`${DBL}`, client)
poster.on('posted', async() => { // ran when succesfully posted
    client.logger.debug('Top.gg Stats Posted!')
  })
client.start()