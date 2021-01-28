import requests

from bs4 import BeautifulSoup

LIMIT = 50
URL = f"https://kr.indeed.com/취업?as_and=python&limit={LIMIT}"


def get_last_page():
    # 사이트 안의 페이지 총 수를 찾는 함수

    call_url = requests.get(URL)  # 사이트 불러와서 변수에 저장

    soup = BeautifulSoup(call_url.text, "html.parser")  # 사이트의 html문서 텍스트 가져오기

    pagination = soup.find(
        "div", {"class": "pagination"}
    )  # html문서 안에 pagination이란 class를 가진 div찾아서...
    # find랑 find_all 차이를 잘 모르겠따 21.01.15

    links = pagination.find_all("a")

    pages = []
    for link in links[:-1]:
        pages.append(int(link.string))

    max_page = pages[-1]
    return max_page


def job_format(html_result):
    title = html_result.find("h2", {"class": "title"}).find("a")["title"]
    company = html_result.find("span", {"class": "company"}).text
    location = html_result.find("div", {"class": "recJobLoc"})["data-rc-loc"]
    job_id = html_result["data-jk"]
    job = {
        "Title": title.strip(),
        "Company": company.strip(),
        "Location": location,
        "Link": f"https://kr.indeed.com/%EC%B1%84%EC%9A%A9%EB%B3%B4%EA%B8%B0?jk={job_id}",
    }
    return job


def extract_jobs(max_page):
    # 페이지에서 찾은 직업들을 페이지마다 모아서 job에 array시킴
    jobs = []

    for page in range(max_page):
        print(f"#Scrapping indeed page {page+1}#")
        # 반복문이 정상적으로 잘 돌아가는지 확인하는 문장
        each_page_url = requests.get(f"{URL}&start={page*LIMIT}")
        # 페이지 이동하는 문장
        soup = BeautifulSoup(each_page_url.text, "html.parser")
        # 페이지의 html문서를 가져오는 문장
        results = soup.find_all("div", {"class": "jobsearch-SerpJobCard"})
        # 페이지에서 50개의 각 직업 정보가 담겨있는 div을 result에 찾아 array시키는 문장
        for result in results:
            # jobs에 결과물 array시켜주는 문장
            jobs.append(job_format(result))

    return jobs


def show_indeed_job_list():
    # 실행하는 함수
    last_page = get_last_page()
    jobs = extract_jobs(last_page)

    return jobs
