import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

import '../theme/columnbox.css';

export default class ColumnBoxUI extends Plugin {
	init() {
		const editor = this.editor;
		const t = editor.t;

		editor.ui.componentFactory.add( 'columnBox', locale => {
			const command = editor.commands.get( 'insertColumnBox' );

			const buttonView = new ButtonView( locale );

			buttonView.set( {
				label: t( 'Insert 2 columns' ),
				withText: true,
				tooltip: true
			} );

			buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			this.listenTo( buttonView, 'execute', () => editor.execute( 'insertColumnBox' ) );

			return buttonView;
		} );
	}
}
