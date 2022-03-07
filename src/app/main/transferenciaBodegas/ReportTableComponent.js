import * as React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles2 = StyleSheet.create({
	table: {
		width: '100%'
	},
	row: {
		display: 'flex',
		flexDirection: 'row',
		// border: '1px solid #EEE',
		// borderRadius: 2,
		paddingTop: 8,
		paddingBottom: 8,
		fontSize: 8
	},
	header: {
		border: '1',
		marginLeft: 5,
		marginRight: 5,
		borderRadius: 10,
		padding: 8
	},
	bold: {
		fontWeight: '900'
	},
	body: {
		marginLeft: 5,
		marginRight: 5,
		padding: 8
	},
	row1: {
		width: '10%'
	},
	row2: {
		width: '15%'
	},
	row3: {
		width: '20%'
	},
	row4: {
		width: '20%'
	},
	row5: {
		width: '45%'
	},
	row6: {
		width: '18%'
	}
});

const f = new Date();
const striDate = `${f.getDate()} - ${f.getMonth() + 1} - ${f.getFullYear()}`;

export default function ReportTable({ lista }) {
	console.log('Lista que llega al componente');
	console.log(lista);
	return (
		<Document>
			<Page size="A4">
				<View style={{ textAlign: 'center', padding: 16 }}>
					<Text style={{ fontSize: 18, margin: 2 }}> TRANSFERENCIA DE PRODUCTOS.</Text>
					<Text style={{ fontSize: 15, margin: 2 }}> --------------------------- </Text>
					<Text style={{ fontSize: 11, margin: 2 }}> Fecha: {striDate} </Text>
				</View>
				<View style={styles2.table}>
					{lista.map((row, i) => (
						<View key={i} style={[styles2.row, styles2.body]} wrap={false}>
							<Text style={styles2.row1}>{row.CODIGO}</Text>
							<Text style={styles2.row2}>{row.NOMBRE}</Text>
							<Text style={styles2.row3}>{row.CANTIDAD}</Text>
							<Text style={styles2.row4}>{row.ORIGEN}</Text>
							<Text style={styles2.row4}>{row.DESTINO}</Text>
						</View>
					))}
				</View>
			</Page>
		</Document>
	);
}
