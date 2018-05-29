'use babel';

import PandocToolsView from './pandoc-tools-view';
import { CompositeDisposable } from 'atom';

export default {

  pandocToolsView: null,
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
    this.modalPanel.destroy();
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
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
