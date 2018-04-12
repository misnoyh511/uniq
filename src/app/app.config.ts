import {environment} from '../environments/environment';
export class AppConfig {

    public static USER_INFO_KEY = environment.USER_INFO_KEY;
    public static ANALYTICS_TOKEN = environment.ANALYTICS_TOKEN;
    public static ANALYTICS_API_ENDPOINT = environment.ANALYTICS_API_ENDPOINT;
    public static API_ENDPOINT = environment.API_ENDPOINT;
    public static MODULE_NAME = ['knowledge-center', 'conversation', 'reports'];
}
