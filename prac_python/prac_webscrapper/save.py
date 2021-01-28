import csv


def upload_file_to_excel(jobs):
    file = open("job_result.csv", mode="w")
    writer = csv.writer(file)
    writer.writerow(["Title", "Company", "Location", "Link"])

    for job in jobs:
        writer.writerow(job.values())

    return