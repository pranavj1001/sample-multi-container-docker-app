import React, { Component } from 'react';
import axios from 'axios';

class FibonacciCalculator extends Component {
    state = {
        seenIndexes: [],
        values: {},
        index: ''
    };

    componentDidMount() {
        this.fetchValues();
        this.fetchIndexes();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({ values: values.data });
    }

    async fetchIndexes() {
        const seenIndexes = await axios.get('/api/values/all');
        this.setState({ seenIndexes: seenIndexes.data });
    }

    renderSeenIndices() {
        return this.state.seenIndexes.map(({ number }) => number).join(', ');
    }

    renderValues() {
        const entries = [];

        for (let key in this.state.values) {
            
        }
        return this.state.values
    }

    render() {
        return (
            <div>
                <form>
                    <label>Enter your label</label>
                    <input />
                    <button>Submit</button>
                </form>

                <h3>Indexes I have seen:</h3>
                {this.renderSeenIndices()}

                <h3>Calculated Values:</h3>
                {this.renderValues()}
            </div>
        );
    }
}
