//
//  TreeLogger.swift
//  AnnexTreeSurvey
//
//  Created by Youssef El Mays on 2022-04-10.
//

import SwiftUI
import Photos
import PhotosUI

struct TreeLogger: View {
    
    @State var image: Image? = nil
        @State private var selectedImage: UIImage?
        @State private var isImagePickerDisplay = false
    @State var showCaptureImageView: Bool = true

    
    var body: some View {
        ZStack {
              VStack {
                  GeometryReader { geo in
                image?.resizable()
                          .frame(width: geo.size.width, height: geo.size.height * 0.8)
                          .scaledToFit()
                  .overlay(Rectangle().stroke(Color.white, lineWidth: 4))
                  }
                  if(image != nil) {
                      if(Float.random(in: 0.0..<1.0) > 0.6) {
                          Text("Tree Not Classified, Please retake Photo")
                          Button("Retake", action:  {
                              self.showCaptureImageView.toggle()
                        }).padding(
                        ).foregroundColor(Color.white).background(Color.mint).clipShape(RoundedRectangle(cornerRadius: 10)).font(.system(size: 30, weight: .bold, design: .rounded))
                      }
                      else {
                          Text("Tree Successfully Classified as [Species]")
                          NavigationLink("Back To Route", destination: MapView()).padding(
                          ).foregroundColor(Color.white).background(Color.mint).clipShape(RoundedRectangle(cornerRadius: 10)).font(.system(size: 30, weight: .bold, design: .rounded))
                      }
                  }
                  
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
