import React, { Component } from 'react';
import { Form, Button, Input } from 'semantic-ui-react';
import Layout from '../../components/Layout';

class CampaignNew extends Component {
    state = {
        minimumContribution: ''
    };

    render() {
        return (
            <Layout>
                <h3>Create a campaign!</h3>

                  <Form>
                    <Form.Field>
                      <label>Minimum contribution</label>
                      <Input value={this.state.minimumContribution}
                          onChange={ event => this.setState({ minimumContribution:event.target.value })}
                          label='wei'
                          labelPosition='right'
                      />
                    </Form.Field>
                    <Button type='submit' color='yellow'>Create!</Button>
                  </Form>

            </Layout>
        );
    }
}

export default CampaignNew;