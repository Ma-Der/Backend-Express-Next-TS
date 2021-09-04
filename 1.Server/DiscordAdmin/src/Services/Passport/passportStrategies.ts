import DiscordStrategy from 'passport-discord';
import { clientId, clientSecret, redirectUri } from '../../Config/envVariables';
import { passportDiscordHandler } from './passportRedirectHandler';

export const scopes = ['identify','guilds', 'guilds.join', 'email'];
export const discordStrategy = new DiscordStrategy({
    clientID: clientId,
    clientSecret: clientSecret,
    callbackURL: redirectUri,
    scope: scopes, 
    passReqToCallback: true
}, passportDiscordHandler);