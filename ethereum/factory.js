import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x15BD9e1A649C63E2E6556ccF6C4Ce2E63912D9d5'
);

export default instance;
