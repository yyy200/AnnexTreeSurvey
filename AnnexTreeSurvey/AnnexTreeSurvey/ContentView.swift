//
//  ContentView.swift
//  AnnexTreeSurvey
//
//  Created by Youssef El Mays on 2022-04-10.
//

import SwiftUI

struct ContentView: View {
    
    
    
    var body: some View {
        NavigationView{
            MapView().navigationTitle("ANNEX Tree Survey")
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
            .previewInterfaceOrientation(.portrait)
    }
}
