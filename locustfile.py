from locust import HttpUser, task, between



class HelloWorldUser(HttpUser):
    host = "http://localhost:8081"
    wait_time = between(2,4)
    @task
    def hello_world(self):
        self.client.post('/', data = {
        "semester": "446284",
        "unit": "Trường Công nghệ Thông tin và Truyền thông",
        "teacher": "Nguyễn Văn A",
        "courseId": "IT3930",
        "classType": "DA",
        "courseName": "Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi)) Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi)) Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi)) Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi)) Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi)) Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi))Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi)) Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi)) Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi))Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi)) Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi)) Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi))Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi)) Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi)) Project II - Bộ môn HTTT (K62 trở đi - Bộ môn HTTT (K62 trở đi))",
        "eduProgram": "KSCQ - Bộ môn HTTT (K62 trở đi)",
        "classId": "QT 705358",
        "inputterId": "lam.doba@hust.edu.vn",
        "signatureImageUrl": "https://storage.googleapis.com/hust-files/5807675312963584/images/hust-logo-official_.3m.jpeg",
        "students": [
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            },
            {
                "studentId": "20172943",
                "name": "Nguyễn Thị Nguyệt Ánh",
                "class": "Công nghệ thông tin 11-K62",
                "midterm": 7.5,
                "note": "Vắng thi"
            }
        ]
    })

