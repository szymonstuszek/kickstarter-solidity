import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x51Eb61993502a22F573c90E2680342FD8743af63'
);

export default instance;
