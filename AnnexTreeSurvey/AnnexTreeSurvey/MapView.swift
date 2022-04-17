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

//    func getRoute() {
//        guard let url = URL(string: "http://0.0.0.0:3000/route") else { return }
//        let task = URLSession.shared.dataTask(with: url, completionHandler: { (data, response, error) in
//            if let error = error {
//              print("Error accessing server: \(error)")
//              return
//            }
//            guard let httpResponse = response as? HTTPURLResponse,
//                       (200...299).contains(httpResponse.statusCode) else {
//                print("Error with the response, unexpected status code: \(String(describing: response))")
//               return
//            }
//            if let data = data {
//                    guard let geojson = try? MKGeoJSONDecoder().decode(data) else { fatalError("wrong format") }
//                    var overlays = [MKOverlay]()
//
//                    for item in geojson {
//                        if let feature = item as? MKGeoJSONFeature {
//                            for geo in feature.geometry {
//                                if let multistring = geo as? MKMultiPolyline {
//                                    overlays.append(multistring)
//                                }
//                            }
//                        }
//                    }
//
//                    self.objs = overlays
//            }
//        })
//
//        task.resume()
//    }
    
    var body: some View {
        ZStack(alignment: .bottom) {
            TheMAP().accentColor(Color.mint).frame(minWidth: 0, idealWidth: .infinity, maxWidth: .infinity, minHeight: 0, idealHeight: .infinity, maxHeight: .infinity, alignment: .bottom).ignoresSafeArea()
            
            NavigationLink("Log A Tree", destination: TreeLogger()).customStyle()
        }
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

import Contacts

struct TheMAP: UIViewRepresentable {
    
  typealias UIViewType = MKMapView
    
    @StateObject var viewModel = MapViewModel()
    
     
     func makeCoordinator() -> MapViewCoordinator {
       return MapViewCoordinator()
     }
     
    func makeUIView(context: Context) -> MKMapView {
       let mapView = MKMapView()
         viewModel.checkForLocationServices()
         viewModel.locationManagerDidChangeAuthorization(viewModel.locationManager!)
         mapView.delegate = context.coordinator
         mapView.setRegion(viewModel.region, animated: true)
         mapView.showsUserLocation = true
         mapView.setUserTrackingMode(.follow, animated: true)
        
         let p1 = MKPlacemark(coordinate: viewModel.region.center, addressDictionary: [CNPostalAddressCountryKey:"Start"])
         let p2 = MKPlacemark(coordinate: CLLocationCoordinate2D(latitude: 43.67194329249824, longitude: -79.4074375128927), addressDictionary: [CNPostalAddressCountryKey:"Tree"])
         let p3 = MKPlacemark(coordinate: CLLocationCoordinate2D(latitude: 43.67103484529716, longitude: -79.4030050400584), addressDictionary: [CNPostalAddressCountryKey:"Tree"])

         let firstLeg = MKDirections.Request()
         let secondLeg = MKDirections.Request()
         
         firstLeg.source = MKMapItem(placemark:p1)
         firstLeg.destination = MKMapItem(placemark: p2)
         firstLeg.transportType = .walking
         
         secondLeg.source = MKMapItem(placemark: p2)
         secondLeg.destination = MKMapItem(placemark: p3)
         secondLeg.transportType = .walking
         
    
        let fldirections = MKDirections(request: firstLeg)
        let sldirections = MKDirections(request: secondLeg)
        fldirections.calculate { response, error in
            guard let route1 = response?.routes.first else { return }
            sldirections.calculate { res, err in
                guard let route2 = res?.routes.first else { print("an error \(String(describing: err))");return }

                mapView.addOverlays([route1.polyline, route2.polyline])
            }
        }
        
        mapView.addAnnotations([p2, p3])
        
        return mapView
     }
  

  func updateUIView(_ uiView: MKMapView, context: Context) {
      uiView.setRegion(viewModel.region, animated: true)
  }
    
    class MapViewCoordinator: NSObject, MKMapViewDelegate {
        func mapView(_ mapView: MKMapView, rendererFor overlay: MKOverlay) -> MKOverlayRenderer {
          let renderer = MKPolylineRenderer(overlay: overlay)
          renderer.strokeColor = .systemBlue
          renderer.lineWidth = 5
          return renderer
        }
      }
}
