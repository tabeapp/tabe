//
//  TabeApp.swift
//  TabeWatch Extension
//
//  Created by Alex Saveliev on 12/7/20.
//

import SwiftUI

@main
struct TabeApp: App {
    @SceneBuilder var body: some Scene {
        WindowGroup {
            NavigationView {
                ContentView()
            }
        }

        WKNotificationScene(controller: NotificationController.self, category: "myCategory")
    }
}
