//
//  TabeApp.swift
//  Tabe
//
//  Created by Alex Saveliev on 12/7/20.
//

import SwiftUI

import Amplify
import AmplifyPlugins

func configureAmplify() {
    let dataStorePlugin = AWSDataStorePlugin(modelRegistration: AmplifyModels())
    do {
        try Amplify.add(plugin: dataStorePlugin)
        try Amplify.configure()
        print("Initialized Amplify");
    } catch {
        print("Could not initialize Amplify: \(error)")
    }
}

@main
struct TabeApp: App {
    public init() {
        configureAmplify()
    }
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}
