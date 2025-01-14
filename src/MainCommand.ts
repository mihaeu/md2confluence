import { Config } from "./Config";
import { ConfigLoader } from "./ConfigLoader";
import { ConfluenceAPI } from "./ConfluenceAPI";
import { updatePage } from "./UpdatePage";

export default async function(configPath: string | null, force: boolean = false) {
    const config: Config = await ConfigLoader.load(configPath);
    const confluenceAPI = new ConfluenceAPI(config.baseUrl, config.user!, config.pass!);

    for (const pageData of config.pages) {
        await updatePage(confluenceAPI, pageData, config, force);
    }
}
