//
//  ContentView.swift
//  TabeWatch Extension
//
//  Created by Alex Saveliev on 12/7/20.
//

import SwiftUI

struct ContentView: View {
    var body: some View {
        ScrollView {
            VStack {
                Text("Squat")
                    .font(.headline)
                    .lineLimit(0)


                Divider()

                Text("5 sets")
                    .font(.caption)
                    .bold()
                    .lineLimit(0)

                Text("5 reps")
                    .font(.caption)

            
            }
        }
        .padding(16)

    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
