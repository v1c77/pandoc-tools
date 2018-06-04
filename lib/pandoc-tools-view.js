'use babel';

import path from 'path';
import _ from 'underscode-plus'
import fs from 'fs-plus'
import {Emitter, Disposable, CompositeDisposable, File} from 'atom';


export default class PandocToolsView {

  constructor(serializedState) {
    // {editorId, filePath} obj
    this.editorID = serializedState.editorID;
    this.filePath = serializedState.filePath;
    this.element = document.createElement('div');
    this.element.classList.add('pandoc-tools');
    this.element.tabIndex = -1;
    this.emitter = new Emitter;
    this.loaded = false;
    this.disposables = new CompositeDisposable;
    this.registerScrollCommands();


  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
