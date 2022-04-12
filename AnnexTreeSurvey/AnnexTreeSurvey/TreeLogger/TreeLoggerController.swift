//
//  TreeLoggerController.swift
//  AnnexTreeSurvey
//
//  Created by Youssef El Mays on 2022-04-10.
//

import Foundation
import UIKit
import Photos
import PhotosUI

class TreeLoggerController {

    let vc = UIImagePickerController()
   
    
    override func viewDidLoad() {
        super.viewDidLoad()
        vc.sourceType = .camera
        vc.allowsEditing = true
        present(vc, animated: true)
    }
}
