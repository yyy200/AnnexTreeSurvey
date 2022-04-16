//
//  TreeClassifier.swift
//  AnnexTreeSurvey
//
//  Created by Youssef El Mays on 2022-04-12.
//

import Foundation
import CoreML
import SwiftUI
import Vision

class TreeClassifier {
    let imageClassifierWrapper = try? TreeSpeciesClassifier_2(configuration: MLModelConfiguration())
    
    func CreateImageClassifier() -> VNCoreMLModel{
        guard let imageClassifier = imageClassifierWrapper else {
              fatalError("App failed to create an image classifier model instance.")
        }
        let imageClassifierModel = imageClassifier.model
        
        guard let imageClassifierVisionModel = try? VNCoreMLModel(for: imageClassifierModel) else {
                fatalError("App failed to create a `VNCoreMLModel` instance.")
            }
        return imageClassifierVisionModel
    }
    
    func CreateRequestHandler(image: CGImage) -> VNImageRequestHandler{
        let handler = VNImageRequestHandler(cgImage: image, orientation: .up)
        return handler
    }
    
    func MakePredictions(image: CGImage) {
//        let imageClassificationRequest = VNCoreMLRequest(model: ImagePredictor.imageClassifier,
//                                                         completionHandler: visionRequestHandler)
//
//        imageClassificationRequest.imageCropAndScaleOption = .centerCrop
//
//        let requests: [VNRequest] = [imageClassificationRequest]

    }
}
