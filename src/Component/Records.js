import React, {Component} from 'react';
import Record from './Record';
import RecordForm from './RecordForm'
import * as RecordsAPI from '../utils/RecordsAPI'

class Records extends Component {
    constructor() {
        super();
        this.state = {
            error: null,
            isLoaded: false,
            records: []
        }
    }

    componentDidMount() {
        RecordsAPI.getAll()
            .then(
                response => this.setState({
                    records: response.data,
                    isLoaded: true
                })
            ).catch(
            error => this.setState({
                isLoaded: true,
                error
            })
        )
    }

    addRecord(record) {
        console.log(record);
        this.setState({
            error: null,
            isLoaded: true,
            records: [
                ...this.state.records,
                record
            ]
        })
    }

    updateRecord(record, data) {
        const recordIndex = this.state.records.indexOf(record);
        const newrecords = this.state.records.map((item, index) => {
            if (index !== recordIndex) {
                return item;
            }
            return {
                ...item,
                ...data
            };
        });
        this.setState({
            records: newrecords
        })
    }

    render() {
        const {error, isLoaded, records} = this.state;
        let recordsComponent;
        if (error) {
            recordsComponent = <div> Error: {error.message} </div>
        } else if (!isLoaded) {
            recordsComponent = <div>Loading...</div>
        } else {
            recordsComponent = (
                <div>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th>Date</th>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {records.map((record) => <Record key={record.id} record={record}
                                                         handleEditRecord={this.updateRecord.bind(this)}/>)}
                        </tbody>
                    </table>
                </div>
            );
        }
        return (
            <div>
                <h2>Records</h2>
                <RecordForm handleNewRecord={this.addRecord.bind(this)}/>
                {recordsComponent}
            </div>
        )
    }
}

export default Records;
