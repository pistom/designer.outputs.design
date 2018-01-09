import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import getProjectMessages from './actions/getProjectMessages';
import getProjectData from './actions/getProjectData';
import Login from './components/Login'

class App extends Component {

    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return (
            <div>
                {
                    !this.props.projectData.isLoadingData &&
                    !this.props.projectData.loadingDataError &&
                    !this.props.projectData.error ?
                        (
                            <div>
                                <span onClick={this.props.actions.getProjectData}>Test</span>
                            </div>
                        ) : (
                            <Login
                                error={this.props.projectData.error}
                                getProjectData={this.props.actions.getProjectData}
                                getProjectMessages={this.props.actions.getProjectMessages}
                                getMessages={this.props.actions.getMessages}
                            />
                        )
                }
            </div>
        )
    }

}

function mapStateToProps(store) {
    const props = {
        projectData: store.projectData,
        projectMessages: store.projectMessages
    };
    return props;
}

function mapDispatchToProps(dispatch) {
    const actions = {
        getProjectMessages,
        getProjectData
    };
    const actionMap = {actions: bindActionCreators(actions, dispatch)};
    return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
