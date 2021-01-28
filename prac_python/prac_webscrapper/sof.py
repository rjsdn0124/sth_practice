import requests

from bs4 import BeautifulSoup

URL = "https://stackoverflow.com/jobs?q=python"


def get_last_page():
    # 사이트 안의 페이지 총 수를 찾는 함수

    call_url = requests.get(URL)  # 사이트 불러와서 변수에 저장

    soup = BeautifulSoup(call_url.text, "html.parser")  # 사이트의 html문서 텍스트 가져오기

    pagination = soup.find("div", {"class": "s-pagination"}).find_all("span")
    # html문서 안에 pagination이란 class를 가진 div찾아서...
    last_page = pagination[-2].string
    return int(last_page)


def extract_jobs(last_page):
    jobs = []
    for page in range(1, last_page):
        print(f"#Scrapping sof page {page}#")
        # indeed.py의 page+1과 지금 함수의 page는 원하는건 같지만 표현이 다름 변수의 기준을 맞추는 사람이 되자!
        each_page_url = requests.get(f"{URL}&pg={page}")
        soup = BeautifulSoup(each_page_url.text, "html.parser")
        results = soup.find_all("div", {"class": "grid--cell fl1"})

        for result in results:
            job = job_format(result)
            jobs.append(job)

    return jobs


def job_format(html_result):

    title = html_result.find("a").text
    company, location = html_result.find("h3").find_all("span", recursive=False)
    job_id = html_result.find("a").attrs["href"]
    # anchor 태그에서 href속성 attrs[]함수로 추출

    format_result = {
        "Title": title,
        "Company": company.text.strip(),
        "Location": location.text.strip(),
        "Link": f"https://stackoverflow.com/{job_id}",
    }

    return format_result


def show_sof_job_list():
    # 실행하는 함수
    last_page = get_last_page()
    jobs = extract_jobs(last_page)

    return jobs