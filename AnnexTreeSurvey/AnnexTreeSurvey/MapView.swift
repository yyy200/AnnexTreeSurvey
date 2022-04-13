//
//  MapView.swift
//  AnnexTreeSurvey
//
//  Created by Youssef El Mays on 2022-04-10.
//

import SwiftUI
import MapKit

struct MapView: View {
    
    @StateObject var viewModel = MapViewModel()
    
    @State var objs: [MKOverlay] = []
    
    let locationManager = CLLocationManager()

    func getRoute() {
        guard let url = URL(string: "http://0.0.0.0:3000/route") else { return }
        let task = URLSession.shared.dataTask(with: url, completionHandler: { (data, response, error) in
            if let error = error {
              print("Error accessing server: \(error)")
              return
            }
            guard let httpResponse = response as? HTTPURLResponse,
                       (200...299).contains(httpResponse.statusCode) else {
                print("Error with the response, unexpected status code: \(String(describing: response))")
               return
            }
            if let data = data {
                    guard let geojson = try? MKGeoJSONDecoder().decode(data) else { fatalError("wrong format") }
                    var overlays = [MKOverlay]()
                    
                    for item in geojson {
                        if let feature = item as? MKGeoJSONFeature {
                            for geo in feature.geometry {
                                if let multistring = geo as? MKMultiPolyline {
                                    overlays.append(multistring)
                                }
                            }
                        }
                    }
                    
                    self.objs = overlays
            }
        })
        
        task.resume()
    }
    
    var body: some View {
        ZStack(alignment: .bottom) {
            Map(coordinateRegion: $viewModel.region, showsUserLocation: true).accentColor(Color.mint).frame(minWidth: 0, idealWidth: .infinity, maxWidth: .infinity, minHeight: 0, idealHeight: .infinity, maxHeight: .infinity, alignment: .bottom).ignoresSafeArea().onAppear(perform: viewModel.checkForLocationServices)
            
            NavigationLink("Log A Tree", destination: TreeLogger()).padding(
            ).foregroundColor(Color.white).background(Color.mint).clipShape(RoundedRectangle(cornerRadius: 10)).font(.system(size: 30, weight: .bold, design: .rounded))
        }.onAppear(perform: getRoute)
    }
}

struct MapView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
            MapView()
        }
    }
}


final class MapViewModel : NSObject, ObservableObject, CLLocationManagerDelegate {
    var locationManager: CLLocationManager?
    
    @Published var region = MKCoordinateRegion(center: CLLocationCoordinate2D(latitude: 43.65500962813978, longitude: -79.38481267459723), span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05))
    
    func checkForLocationServices() {
        if (CLLocationManager.locationServicesEnabled()) {
            locationManager = CLLocationManager()
            locationManager!.desiredAccuracy = kCLLocationAccuracyBest
            locationManager!.delegate = self
        }
        else {
          print("Please Enable Location for this App")
        }
    }
    
    private func checkLocationAuth() {
        guard let locationManager = locationManager else { return }
        
        switch locationManager.authorizationStatus {
            case .notDetermined:
                locationManager.requestWhenInUseAuthorization()
            case .restricted:
                locationManager.requestWhenInUseAuthorization()
            case .denied:
                print("hi")
            case .authorizedAlways, .authorizedWhenInUse:
            guard let location = locationManager.location else { return }
            region = MKCoordinateRegion(center: location.coordinate, span: MKCoordinateSpan(latitudeDelta: 0.05, longitudeDelta: 0.05))
            @unknown default:
                    break
        }
    }
    
    func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        checkLocationAuth()
    }
}
