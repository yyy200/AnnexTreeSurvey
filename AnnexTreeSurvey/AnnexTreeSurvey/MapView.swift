//
//  MapView.swift
//  AnnexTreeSurvey
//
//  Created by Youssef El Mays on 2022-04-10.
//

import SwiftUI
import MapKit

struct MapView: View {
    @State private var region = MKCoordinateRegion(center: CLLocationCoordinate2D(latitude: 43.65500962813978, longitude: -79.38481267459723), span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05))
    let locationManager = CLLocationManager()
    
//    locationManager.requestWhenInUseAuthorization();
//
//    region.center =
    
    var body: some View {
        ZStack(alignment: .bottom){
            Map(coordinateRegion: $region).frame(minWidth: 0, idealWidth: .infinity, maxWidth: .infinity, minHeight: 0, idealHeight: .infinity, maxHeight: .infinity, alignment: .top).ignoresSafeArea()
            
            NavigationLink("Log A Tree", destination: TreeLogger()).padding(
            ).foregroundColor(Color.white).background(Color.mint).clipShape(RoundedRectangle(cornerRadius: 10)).font(.system(size: 30, weight: .bold, design: .rounded))
        }
    }
}

struct MapView_Previews: PreviewProvider {
    static var previews: some View {
        MapView()
    }
}
