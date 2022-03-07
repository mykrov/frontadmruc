import * as xl from 'xlsx-js-style';
// import XLSX from 'xlsx';
// // import XLSXStyle from 'xlsx-style';
// import { saveAs } from 'file-saver';
// import path from 'path';
// import _ from 'lodash';

// const FILE_NAME = 'Formulario de educación de Yuntu.xlsx';
// const COL_PARAMS = ['hidden', 'wpx', 'width', 'wch', 'MDW'];
// const STYLE_PARAMS = ['fill', 'font', 'alignment', 'border'];

export const stylemodal = {
	borderRadius: '1rem',
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: { xs: '90%', sm: '90%', md: '90%', lg: '45%' },
	height: '75vh',
	bgcolor: 'background.paper',
	boxShadow: 24
};
export const headers = {
	fontWeight: 'bold',
	fontSize: '2.5rem',
	marginLeft: '1rem'
};
export function printExcel(lista, nom) {
	try {
		// lista.forEach(element => {
		// 	delete element.ID;
		// });
		const workSeet = xl.utils.json_to_sheet(lista);
		const workBook = xl.utils.book_new();
		const wbcols = [{ wpx: 149 }, { wpx: 200 }];
		xl.utils.book_append_sheet(workBook, workSeet, 'Informe');
		// Buffer
		// const buf = XLSX.write(workBook, { bookType: 'xlsx', type: 'buffer' });
		// Binary string
		xl.write(workBook, { bookType: 'xlsx', type: 'binary' });
		xl.writeFile(workBook, `${nom}.xlsx`);
		// return <ModalParaExcel />;
	} catch (error) {
		console.log(error);
	}
}
// excel de prueba
