import ColumnBoxEditing from "./columnboxediting";
import ColumnBoxUI from "./columnboxui";

import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

export default class ColumnBox extends Plugin {
    /**
     * Define dependencies of the module
     */
    static get requires() {
        return [ColumnBoxEditing, ColumnBoxUI];
    }
}