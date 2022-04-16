//
//  ARView.swift
//  AnnexTreeSurvey
//
//  Created by Youssef El Mays on 2022-04-13.
//

import SwiftUI
import RealityKit

struct AugRealView: View {
    var body: some View {
        ARViewContainer().edgesIgnoringSafeArea(.all)
    }
}

struct ARViewContainer: UIViewRepresentable {
    func makeUIView(context: Context) -> ARView {
        let arView = ARView(frame: .zero)
        return arView
    }
    
    func updateUIView(_ uiView: ARView, context: Context) {
        return
    }
}

struct ARView_Previews: PreviewProvider {
    static var previews: some View {
        AugRealView()
    }
}
