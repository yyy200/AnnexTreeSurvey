//
//  GeoJSONModel.swift
//  AnnexTreeSurvey
//
//  Created by Youssef El Mays on 2022-04-13.
//

import Foundation


struct PolygonInfo: Codable {
    var id, kode, jumlah: Int
    let latitude, longitude: Double
    let propinsi: String
    let sumber: String

    enum CodingKeys: String, CodingKey {
        case id = "ID"
        case kode = "kode"
        case propinsi = "Propinsi"
        case sumber = "SUMBER"
        case jumlah = "Jumlah"
        case latitude = "latitude"
        case longitude = "longitude"
    }
}
