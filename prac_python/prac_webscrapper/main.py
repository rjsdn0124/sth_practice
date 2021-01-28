from indeed import show_indeed_job_list
from sof import show_sof_job_list
from save import upload_file_to_excel

indeed_job_result = show_indeed_job_list()
sof_job_result = show_sof_job_list()

jobs_everywhere = indeed_job_result + sof_job_result

upload_file_to_excel(jobs_everywhere)