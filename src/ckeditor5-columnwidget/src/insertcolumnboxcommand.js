import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertColumnBoxCommand extends Command {
	/**
	 * It is called when 'insertColumnBox' is called
	 */
	execute() {
		this.editor.model.change( writer => {
			this.editor.model.insertContent( createColumnBox( writer ) );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'columnBox' );

		this.isEnabled = allowedIn !== null;
	}
}

/**
 * Creates a columnbox and appends to it two columnBoxChilds
 * @param writer the CKEditor writer
 * @returns a new columnBox ready to be appended to the text
 */
function createColumnBox( writer ) {
	const columnBox = writer.createElement( 'columnBox' );
	const columnBoxLeft = writer.createElement( 'columnBoxChild' );
	const columnBoxRight = writer.createElement( 'columnBoxChild' );

	writer.append( columnBoxLeft, columnBox );
	writer.append( columnBoxRight, columnBox );

	writer.appendElement( 'paragraph', columnBoxLeft );
	writer.appendElement( 'paragraph', columnBoxRight );

	return columnBox;
}
