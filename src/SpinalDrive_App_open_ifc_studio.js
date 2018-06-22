/**
 * SpinalDrive_App_open_ifc_studio
 * @extends {SpinalDrive_App}
 */
class SpinalDrive_App_open_ifc_studio extends SpinalDrive_App {
  /**
   * Creates an instance of SpinalDrive_App_open_ifc_studio.
   * @memberof SpinalDrive_App_open_ifc_studio
   */
  constructor() {
    super(
      "OpenSvfFileExplorer",
      "Open with Ifc Studio",
      10,
      "location_city",
      "Open the Ifc Studio"
    );
    this.order_priority = 5;
  }
  /**
   * method to handle the selection
   *
   * @param {any} element
   * @memberof SpinalDrive_App_open_ifc_studio
   */
  action(obj) {
    let authService = obj.scope.injector.get("authService");
    let fs_path = obj.scope.fs_path;
    let username = authService.get_user().username;
    let path = "/__users__/" + username;
    for (var i = 1; i < fs_path.length; i++) {
      path += "/" + fs_path[i].name;
    }
    path += "/" + obj.file.name;
    let myWindow = window.open("", "");
    let location = "/html/ifcstudio/" + btoa(path);
    myWindow.document.location = location;
    myWindow.focus();
  }

  /**
   * method to know if the app is needed to be shown.
   * @param {Object} d node of the tree selectionned
   * @returns {boolean}
   * @memberof SpinalDrive_App_open_ifc_studio
   */
  is_shown(d) {
    if (d && d.file && d.file._server_id) {
      let file = window.FileSystem._objects[d.file._server_id];
      if (
        file &&
        file instanceof File &&
        file._info.model_type &&
        (file._info.model_type.get() === "Ifc twin")
      ) {
        return true;
      }
    }
    return false;
  }
}

module.exports.SpinalDriveAppOpenIfcStudio = SpinalDrive_App_open_ifc_studio;