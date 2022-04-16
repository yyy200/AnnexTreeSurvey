//
//  Button+Extension.swift
//  AnnexTreeSurvey
//
//  Created by Youssef El Mays on 2022-04-13.
//

import Foundation
import SwiftUI

let radius = 9
let size = 24

extension Button {
    func customStyle() -> some View {
        padding().foregroundColor(Color.white).background(Color.mint).clipShape(RoundedRectangle(cornerRadius: CGFloat(radius))).font(.system(size: CGFloat(size), weight: .bold, design: .rounded))
    }
}

extension NavigationLink {
    func customStyle() -> some View {
        padding().foregroundColor(Color.white).background(Color.mint).clipShape(RoundedRectangle(cornerRadius: CGFloat(radius))).font(.system(size: CGFloat(size), weight: .bold, design: .rounded))
    }
}
