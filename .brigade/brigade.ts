import { events, Job } from "@brigadecore/brigadier"

// Use events.on() to define how your script responds to different events. 
// The example below depicts handling of "exec" events originating from
// the Brigade CLI.

events.on("brigade.sh/cloudevents", "cloudevent", async event => {
	let job = new Job("hello", "debian:latest", event)
 	job.primaryContainer.command = ["echo"]
	let eventPayload = JSON.parse(event.payload)
 	job.primaryContainer.arguments = [`blob: ${eventPayload.url}`]
 	await job.run()
})

events.process()
