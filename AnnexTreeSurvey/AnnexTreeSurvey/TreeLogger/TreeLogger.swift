//
//  TreeLogger.swift
//  AnnexTreeSurvey
//
//  Created by Youssef El Mays on 2022-04-10.
//

import SwiftUI
import Photos
import PhotosUI
import CoreML
import UIKit

struct TreeLogger: View {
    
    @State var image: UIImage? = nil
    @State private var isImagePickerDisplay = false
    @State var showCaptureImageView: Bool = true
    @State var classified: Bool = false
    
    let model = { () -> TreeSpeciesClassifier_2 in
        let result = try TreeSpeciesClassifier_2(configuration: MLModelConfiguration())
        return result;
    }
    @State private var classificationLabel: String = ""
    @State private var confidence: Double = 0
    
    private func classifyImage() {
        guard let image = self.image?.resizableImage(withCapInsets: .zero),
              let resizedImage = image.resizeImageTo(size: CGSize(width: 224, height: 224)),
              let buffer = resizedImage.convertToBuffer()
              else {
                return
            }
        
        let output = try? self.model().prediction(image: buffer)
          if let output = output {
              print(output.classLabelProbs)
              let confidence = (output.classLabelProbs.max { $0.1 < $1.1 })?.value
              print(confidence ?? "none" )
              if((confidence ?? 0) > 0.6) {
                  self.classificationLabel = output.classLabel
                  self.classified = true
              }
              self.confidence = confidence!
          }
    }
    
    var body: some View {
        ZStack {
            if(image != nil && !showCaptureImageView) {
              VStack{
                  GeometryReader { geo in
                      Image(uiImage: image!).resizable()
                          .frame(width: geo.size.width, height: geo.size.height * 0.8)
                          .scaledToFit()
                          .overlay(Rectangle().stroke(Color.white, lineWidth: 4))
                  }
                  if(classified) {
                      Text("Tree Successfully Classified as \(classificationLabel.capitalized)")
                      NavigationLink("Back To Route", destination: MapView()).padding(
                      ).foregroundColor(Color.white).background(Color.mint).clipShape(RoundedRectangle(cornerRadius: 10)).font(.system(size: 30, weight: .bold, design: .rounded))
                  }
                  else {
                      Text("Tree Not Classified, Please retake Photo")
                      Button("Retake", action:  {
                          self.showCaptureImageView.toggle()
                    }).padding(
                    ).foregroundColor(Color.white).background(Color.mint).clipShape(RoundedRectangle(cornerRadius: 10)).font(.system(size: 30, weight: .bold, design: .rounded))
                  }
                  Text(String(format: "%.2f", confidence))
              }.onAppear(perform: classifyImage)
          }
                  
              
              if (showCaptureImageView) {
                  CaptureImageView(isShown: $showCaptureImageView, image: $image)
              }
            }
    }
}

struct TreeLogger_Previews: PreviewProvider {
    static var previews: some View {
        TreeLogger()
    }
}
