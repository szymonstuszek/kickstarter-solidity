import React, { Component } from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import { Card, Grid, Button } from 'semantic-ui-react';
import web3 from '../../ethereum/web3'
import ContributeForm from '../../components/ContributeForm';
import { Link } from '../../routes';

class CampaignShow extends Component {
    static async getInitialProps(props) {
        const campaign = Campaign(props.query.address);

        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance,
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of the manager',
                description: 'The manager created this campaign and can create requests.',
                style: { overflowWrap: 'break-word' }
            },
             {
                header: minimumContribution,
                meta: 'Minimum contribution (wei)',
                description: 'You need to contribute at least this much wei to become an approver',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestsCount,
                meta: "Number of Requests",
                description:
                  "A request tries to withdraw money from the contract. Requests must be approved by approvers",
            },
            {
                header: approversCount,
                meta: "Number of Approvers",
                description:
                  "Number of people who have already donated to this campaign",
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign Balance (ether)",
                description:
                  "The balance is how much money this campaign has left to spend.",
            },
        ];

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3>CampaignShow</h3>
                <Grid>
                    <Grid.Column width={10}>
                        {this.renderCards()}
                        <Link route={`/campaigns/${this.props.address}/requests`}>
                            <a>
                                <Button primary>
                                    View requests
                                </Button>
                            </a>
                        </Link>
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;