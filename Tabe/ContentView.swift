//
//  ContentView.swift
//  Tabe
//
//  Created by Alex Saveliev on 12/7/20.
//

import SwiftUI
import Amplify
import AmplifyPlugins


struct ContentView: View {
    func performOnAppear(){
        let item = Todo(name: "Build iOS Application", description: "Build an iOS application using Amplify")
        Amplify.DataStore.save(item) { result in
            switch(result) {
            case .success(let savedItem):
                print("Saved item: \(savedItem.name)")
            case .failure(let error):
                print("Could not save item to datastore: \(error)")
            }
        }
    }

    var body: some View {
        Text("Hello, world!")
            .onAppear {
                self.performOnAppear()
            }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
