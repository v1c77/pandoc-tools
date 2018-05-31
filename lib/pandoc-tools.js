'use babel';
import { CompositeDisposable } from 'atom';
import PandocToolsView from './pandoc-tools-view'

isPandocToolsView = function(object) {
  return object instanceof PandocToolsView;
}

export default {

  PandocToolsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pandocToolsView = new PandocToolsView(state.pandocToolsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pandocToolsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pandoc-tools:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.disposables.dispose();
    this.subscriptions.dispose();
    this.pandocToolsView.destroy();
  },

  serialize() {
    return {
      pandocToolsViewState: this.pandocToolsView.serialize()
    };
  },

  toggle() {
    console.log('PandocTools was toggled!');
      editor = atom.workspace.getActiveTextEditor();
      if (editor == null) {
        return;
      }
      if (!this.removePreviewForEditor(editor)) {
        return this.addPreviewForEditor(editor);
      }
  },

  uriForEditor(editor) {
    return `pandoc-preview://editor/${editor.id}`;
  },

  removePreviewForEditor(editor) {
    var previewPane, uri;
    uri = this.uriForEditor(editor);
    previewPane = atom.workspace.paneForURI(uri);
    if (previewPane != null) {
      previewPane.destoryItem(previewPane.itemForURI(uri));
      return true;
    } else {
      return false;
    }
  },

  addPreviewForEditor(editor) {
    var options, previousActivePane, uri;
    uri = this.uriForEditor(editor);
    preveriousActivePane = atom.workspace.getActivePane();
    options = {
      searchAllPanes: true,
      split: 'right'
    };
    return atom.workspace.open(uri, options).then(function(pandocToolsView) {
      if (isPandocToolsView(pandocToolsView)) {
        return previousActivePane.activate();
      }
    });
  }

};
