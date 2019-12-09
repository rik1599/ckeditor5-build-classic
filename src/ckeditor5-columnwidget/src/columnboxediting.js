import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertColumnBoxCommand from './insertcolumnboxcommand';

export default class ColumnBoxEditing extends Plugin {
    static get requires() {
        return [ Widget ];
    }

    /**
     * Init the plugin
     */
    init() {
        this._defineSchema();
        this._defineConverters();

        this.editor.commands.add('insertColumnBox', new InsertColumnBoxCommand(this.editor));
    }

    /**
     * Define the schema for the plugin
     * <columnBox>
     *      <columnBoxChild></columnBoxLeft>
     *      <columnBoxChild></columnBoxRight>
     * </columnBox>
     */
    _defineSchema() {
        const schema = this.editor.model.schema;

        schema.register('columnBox', {
            isObject: true,
            allowWhere: '$block'
        });

        schema.register('columnBoxChild', {
            isLimit: true,
            allowIn: 'columnBox',
            allowContentOf: '$root'
        });

        schema.addChildCheck((context, childDefinition) => {
            if (context.endsWith( 'columnBoxChild' ) && childDefinition.name == 'columnBox') {
                return false;
            }
        });
    }

    /**
     * Convert the schema of the object into its HTML rappresentation
     * e.g.
     * <columnBox>
     *      <columnBoxChild></columnBoxLeft>
     *      <columnBoxChild></columnBoxRight>
     * </columnBox>
     * 
     * will become
     * <section class="column-box">
     *      <div class="column-box-child"></div>
     *      <div class="column-box-child"></div>
     * </section>
     */
    _defineConverters() {
        const conversion = this.editor.conversion;
        const cssClassesColumnBox = ['column-box', 'prova'];

        conversion.for('upcast').elementToElement({
            model: 'columnBox',
            view: {
                name: 'section',
                classes: cssClassesColumnBox
            }
        });

        conversion.for('dataDowncast').elementToElement({
            model: 'columnBox',
            view: {
                name: 'section',
                classes: cssClassesColumnBox
            }
        });

        conversion.for('editingDowncast').elementToElement({
            model: 'columnBox',
            view: (modelElement, viewVriter) => {
                const section = viewVriter.createContainerElement('section', { class: Array.join(cssClassesColumnBox, ' ') });

                return toWidget(section, viewVriter, {
                    label: 'column box widget', 
                    hasSelectionHandle: true
                });
            }
        });
        

        conversion.for('upcast').elementToElement({
            model: 'columnBoxChild',
            view: {
                name: 'div',
                classes: 'column-box-child'
            }
        });

        conversion.for('dataDowncast').elementToElement({
            model: 'columnBoxChild',
            view: {
                name: 'div',
                classes: 'column-box-child'
            }
        });

        conversion.for('editingDowncast').elementToElement({
            model: 'columnBoxChild',
            view: (modelElement, viewVriter) => {
                const div = viewVriter.createEditableElement('div', {class: 'column-box-child'});

                return toWidgetEditable(div, viewVriter);
            }
        });
    }
}