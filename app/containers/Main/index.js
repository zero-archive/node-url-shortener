import { connect } from 'react-redux';

// actions and selectors
import { editDialog } from '../../actions';
import { getLinks } from '../../selectors';

// display layers
import Main from './layout';

// the data go here
const mapStateToProps = (state) => {
    return {
        links: getLinks(state)
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
