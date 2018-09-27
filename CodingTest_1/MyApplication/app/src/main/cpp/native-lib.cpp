#include <jni.h>
#include <string>

extern "C" JNIEXPORT jstring JNICALL
Java_android_bh_com_myapplication_MainActivity_stringFromJNI(
        JNIEnv *env,
        jobject /* this */) {
    std::string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}

static int counter = 0;

extern "C"
JNIEXPORT jint JNICALL
Java_android_bh_com_myapplication_MainActivity_counterFromJNI(JNIEnv *env,
                                                              jobject instance) {

    counter+=1;
    return counter;

}