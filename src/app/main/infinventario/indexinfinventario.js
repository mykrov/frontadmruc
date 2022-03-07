import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';

import HeaderInfInventario from './components/headersinfinventario';

const useStyles = makeStyles({
	layoutRoot: {},
	header: {
		padding: '12px 1px 1px 12px',
		fontWeight: 'bold',
		fontSize: '2rem'
	}
});

function IndexInfInventario() {
	const classes = useStyles();

	return (
		<FusePageSimple
			classes={{
				root: classes.layoutRoot
			}}
			content={
				<div className="px-24">
					<h1 className={classes.header}>Informe de Stock</h1>
					<HeaderInfInventario />
				</div>
			}
		/>
	);
}

export default IndexInfInventario;
