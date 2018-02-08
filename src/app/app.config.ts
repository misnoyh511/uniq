import {environment} from '../environments/environment';
export class AppConfig {

    public static USER_INFO_KEY = 'firebase:authUser:' + environment.firebase.apiKey + ':' + environment.firebase.appName;
    public static ANALYTICS_API_ENDPOINT = "https://botdex.allegra.ai/api/";
    public static API_ENDPOINT = "https://api.giraffe.io";
}
