import { connect } from 'react-redux';

// actions and selectors
import { editDialog } from '../../actions';

// display layers
import Main from './layout';

// the data go here
const mapStateToProps = (state) => {
    return {
        foo: state.foo
    };
};

// the methods go here
const mapDispatchToProps = (dispatch) => {
    return {
        onEdit: linkId => dispatch(editDialog(linkId))
    };
};

// map these together
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Main);
