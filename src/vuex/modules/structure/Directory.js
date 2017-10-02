import { File } from '../file/File'
import { Document } from '../document/Document'

// Spec: https://gist.github.com/rjbaker/8d9a4b6a7ca2bc0fe4fa9325cdf64702
export class Directory {
  constructor (
    {
      id = null,
      title = null,
      order = null,
      content = '',
      attachments = [],
      documents = [],
      directories = [],
      parentId = null
    }
  ) {
    this._id = id
    this._title = title
    this._order = order
    this._content = content // Maybe its own object?
    this._attachments = attachments // Loop through and declare each object
    this._documents = documents // Loop through and declare each object
    this._directories = directories // loop through and declare each object
    this._parentId = parentId
    this._needsSaving = false
  }

  // Getters and Setters
  // ID
  get id () { return this._id }

  // Title
  set title (title) { this._title = title }
  get title () { return this._title }

  // Order
  set order (order) { this._order = order }
  get order () { return this._order }

  // Content
  set content (content) { this._content = content }
  get content () { return this._content }

  // attachments
  set attachments (attachments) { this._attachments = attachments }
  get attachments () { return this._attachments }

  // attachments
  set documents (documents) { this._documents = documents }
  get documents () { return this._documents }

  // directories
  set directories (directories) { this._directories = directories }
  get directories () { return this._directories }

  // parentId
  set parentId (parentId) { this._parentId = parentId }
  get parentId () { return this._parentId }

  // Needs Saving
  set needsSaving (needsSaving) { this._needsSaving = needsSaving }
  get needsSaving () { return this._needsSaving }

  /**
   * [addAttachment Add an file to the attachments array]
   * @param {Attachment} [attachment=new File()] A new file object
   */
  addAttachment (file = new File()) {
    if (file && this._attachments.findIndex(aFile => (aFile.id === file.id && file.id !== null)) !== -1) {
      this._attachements.push(file)
    }
  }

  /**
   * [addAttachment Add a docuemnt to the documents array]
   * @param {Document} [attachment=new Document()] A new Document object
   */
  addDocument (doc = new Document()) {
    if (doc && this._documents.findIndex(aDoc => (aDoc.id === doc.id && doc.id !== null)) !== -1) {
      this._documents.push(doc)
    }
  }

  /**
   * [removeAttachmentById Remove an Attachment from the attachments array by ID]
   * @param  {Number} id ID to remove
   * @return {Attachment} Returns the removed attachment
   */
  removeAttachmentById (id) {
    if (id) {
      let index = this._attachements.findIndex((attachment) => {
        return attachment.id === id
      })

      if (index > -1) {
        return this._attachements.splice(index, 1)
      }
    }
  }

  /**
   * [addDirectory add a directory]
   * @param {Directory} [directory=new Directory()] A new directory object
   */
  addDirectory (directory = new Directory({})) {
    if (directory) {
      directory.parentId = this.id
      this._directories.push(directory)
    }
  }

  /**
   * [addDirectoryAtIndex add a directory at index]
   * @param {Directory}   [directory=new Directory({})] A new directory to add
   */
  addDirectoryAtIndex ({directory = new Directory({}), index}) {
    directory.parentId = this.id
    directory.needsSaving = true
    if (directory && index >= 0) {
      if (directory.order === null) {
        // Get next hierachy
        directory.order = this.getHighestChildorder()
      }
      if (index > this._directories.length) {
        this.addDirectory(directory)
      } else {
        this._directories.splice(index, 0, directory)
      }
      // Sort
      this.sortDirectories()
    }
  }

  /**
   * [sortDirectories Sort the directories by order]
   */
  sortDirectories () {
    this._directories.sort((a, b) => {
      if (a.order < b.order) {
        return -1
      } else if (a.order > b.order) {
        return 1
      }

      return 0
    })
  }

  /**
   * [getHighestChildorder Get the highest up child order]
   * @return {Number} Order
   */
  getHighestChildorder () {
    let order = 0
    this._directories.forEach((directory) => {
      if (directory.order >= order) {
        order = directory.order + 1
      }
    })
    return order
  }

  /**
   * [removeDirectoryById Remove a directory by ID]
   * @param  {Number} id
   * @return {Directory} Removed Directory
   */
  removeDirectoryById (id) {
    if (id) {
      let index = this._directories.findIndex((directory) => {
        return directory.id === id
      })

      if (index > -1) {
        return this._directories.splice(index, 1)
      }
    }
  }

  /**
   * [flatten Get backend friendly Directory object]
   * @return {Object} The directory object (without the nesting)
   */
  flatten () {
    let directoryObject = {
      id: this.id,
      attachments: this.attachments.map(attachment => {
        attachment.flatten()
      }),
      content: this.content,
      order: this.order,
      parentId: this.parentId,
      needsSaving: this.needsSaving
    }
    return directoryObject
  }
}

/**
 * [updateOrder Update an array of directories orders if the array has been moved about]
 * @param  {Array} directories The directories
 */
Directory.updateOrder = (directories) => {
  for (let i = 0; i < directories.length; i++) {
    if (directories[i].order !== i) {
      directories[i].order = i
      directories[i].needsSaving = true
    }
  }
}
